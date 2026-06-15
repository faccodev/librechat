import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import type { WorkspaceNode, WorkspaceSearchResult } from 'librechat-data-provider';
import FileSearch from '../FileSearch';

const CONVO_ID = 'convo-1';

const mockSetShowFileSearchPopover = jest.fn();
const mockSetFiles = jest.fn();
const mockShowFileSearchPopover = { current: true };

jest.mock('recoil', () => {
  const actual = jest.requireActual('recoil');
  return {
    ...actual,
    useRecoilValue: jest.fn((atom: unknown) => {
      if (atom === 'show-files-popover') {
        return mockShowFileSearchPopover.current;
      }
      return undefined;
    }),
    useSetRecoilState: jest.fn((atom: unknown) => {
      if (atom === 'show-files-popover') {
        return mockSetShowFileSearchPopover;
      }
      return jest.fn();
    }),
  };
});

jest.mock('~/store', () => ({
  __esModule: true,
  default: {
    showFileSearchPopoverFamily: () => 'show-files-popover',
  },
}));

const mockUseWorkspaceSearch = jest.fn();
jest.mock('~/data-provider', () => ({
  useWorkspaceSearch: (q: string) => mockUseWorkspaceSearch(q),
}));

const mockUseLocalize = jest.fn((key: string) => key);
jest.mock('~/hooks', () => ({
  useLocalize: () => mockUseLocalize,
}));

jest.mock('@librechat/client', () => {
  const actual = jest.requireActual('@librechat/client');
  return {
    ...actual,
    Spinner: () => null,
  };
});

jest.mock('react-virtualized', () => ({
  ...jest.requireActual('react-virtualized'),
  AutoSizer: ({ children }: { children: (size: { width: number }) => React.ReactNode }) =>
    children({ width: 320 }),
  List: ({
    rowCount,
    rowRenderer,
  }: {
    rowCount: number;
    rowRenderer: (args: {
      index: number;
      key: string;
      style: React.CSSProperties;
    }) => React.ReactNode;
  }) => {
    const rows: React.ReactNode[] = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(rowRenderer({ index: i, key: `row-${i}`, style: {} }));
    }
    return <ul data-testid="files-list">{rows}</ul>;
  },
}));

const makeTextarea = (initial = '@') => {
  const textarea = document.createElement('textarea');
  textarea.value = initial;
  document.body.appendChild(textarea);
  return { current: textarea } as React.MutableRefObject<HTMLTextAreaElement | null>;
};

const makeNode = (overrides: Partial<WorkspaceNode>): WorkspaceNode => ({
  name: 'test-document.pdf',
  path: 'test-document.pdf',
  type: 'file',
  size: 1024 * 1024,
  mime: 'application/pdf',
  modifiedAt: new Date().toISOString(),
  ...overrides,
});

const workspaceResult = (matches: WorkspaceNode[]): WorkspaceSearchResult => ({
  query: 'test',
  matches,
  total: matches.length,
  truncated: false,
});

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
  mockShowFileSearchPopover.current = true;
  // Default mock: backend is idle, no results yet.
  mockUseWorkspaceSearch.mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
  });
});

describe('FileSearch', () => {
  it('renders nothing when the popover atom is false', () => {
    mockShowFileSearchPopover.current = false;
    const textAreaRef = makeTextarea();
    const { container } = render(
      <FileSearch index={0} textAreaRef={textAreaRef} setFiles={mockSetFiles} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the initial hint before any query is typed', () => {
    const textAreaRef = makeTextarea('@');
    render(<FileSearch index={0} textAreaRef={textAreaRef} setFiles={mockSetFiles} />);
    expect(screen.getByText('com_files_search_hint')).toBeInTheDocument();
  });

  it('does not request results for queries shorter than 3 characters', () => {
    const textAreaRef = makeTextarea('@');
    render(<FileSearch index={0} textAreaRef={textAreaRef} setFiles={mockSetFiles} />);

    const input = screen.getByPlaceholderText('com_files_filter') as HTMLInputElement;
    act(() => {
      const proto = Object.getPrototypeOf(input);
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      setter?.call(input, 'ab');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // useWorkspaceSearch should have been called with empty query
    // (i.e. the debounced + below-threshold query is treated as no
    // query and the hook is invoked with '').
    const lastCallQuery = mockUseWorkspaceSearch.mock.calls.at(-1)?.[0] as string;
    expect(lastCallQuery).toBe('');
  });

  it('renders list of files and can select one', async () => {
    const user = userEvent.setup();
    const textAreaRef = makeTextarea('@');
    mockUseWorkspaceSearch.mockReturnValue({
      data: workspaceResult([makeNode({})]),
      isLoading: false,
      isError: false,
    });

    render(<FileSearch index={0} textAreaRef={textAreaRef} setFiles={mockSetFiles} />);

    // Type a 4-char query; the local debounce + the backend mock fire
    // synchronously in this test (jest fake timers would slow it
    // down), so the row should appear.
    const input = screen.getByPlaceholderText('com_files_filter') as HTMLInputElement;
    await act(async () => {
      const proto = Object.getPrototypeOf(input);
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      setter?.call(input, 'test');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const fileButton = await waitFor(() =>
      screen.getByRole('button', { name: /test-document.pdf/i }),
    );
    expect(fileButton).toBeInTheDocument();

    await act(async () => {
      await user.click(fileButton);
    });

    expect(mockSetFiles).toHaveBeenCalledTimes(1);
    const updater = mockSetFiles.mock.calls[0][0];
    const initialMap = new Map();
    const updatedMap = updater(initialMap);
    // Workspace files use `workspace:<path>` as the synthetic id.
    expect(updatedMap.has('workspace:test-document.pdf')).toBe(true);
    expect(updatedMap.get('workspace:test-document.pdf')).toEqual({
      file_id: 'workspace:test-document.pdf',
      file: undefined,
      type: 'application/pdf',
      progress: 1,
      size: 1024 * 1024,
      filename: 'test-document.pdf',
      filepath: 'test-document.pdf',
      source: 'workspace',
      embedded: undefined,
      preview: undefined,
    });

    expect(textAreaRef.current?.value).toBe('');
    expect(mockSetShowFileSearchPopover).toHaveBeenCalledWith(false);
  });
});
