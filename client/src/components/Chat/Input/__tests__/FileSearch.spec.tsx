import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import type { TFile } from 'librechat-data-provider';
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

const mockUseGetFiles = jest.fn();
jest.mock('~/data-provider', () => ({
  useGetFiles: () => mockUseGetFiles(),
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

const makeFile = (overrides: Partial<TFile>): TFile => ({
  file_id: 'file-1',
  user: 'user-1',
  bytes: 1024 * 1024,
  embedded: false,
  filename: 'test-document.pdf',
  filepath: '/uploads/test-document.pdf',
  object: 'file',
  type: 'application/pdf',
  usage: 0,
  ...overrides,
});

const filesResponse = [makeFile({})];

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
  mockShowFileSearchPopover.current = true;
  mockUseGetFiles.mockReturnValue({
    data: filesResponse,
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

  it('renders list of files and can select one', async () => {
    const user = userEvent.setup();
    const textAreaRef = makeTextarea('@');
    render(<FileSearch index={0} textAreaRef={textAreaRef} setFiles={mockSetFiles} />);

    const fileButton = await screen.findByRole('button', { name: /test-document.pdf/i });
    expect(fileButton).toBeInTheDocument();

    await act(async () => {
      await user.click(fileButton);
    });

    expect(mockSetFiles).toHaveBeenCalledTimes(1);
    const updater = mockSetFiles.mock.calls[0][0];
    const initialMap = new Map();
    const updatedMap = updater(initialMap);
    expect(updatedMap.has('file-1')).toBe(true);
    expect(updatedMap.get('file-1')).toEqual({
      file_id: 'file-1',
      file: undefined,
      type: 'application/pdf',
      progress: 1,
      size: 1024 * 1024,
      filename: 'test-document.pdf',
      filepath: '/uploads/test-document.pdf',
      source: undefined,
      embedded: false,
      preview: undefined,
    });

    expect(textAreaRef.current?.value).toBe('');
    expect(mockSetShowFileSearchPopover).toHaveBeenCalledWith(false);
  });
});
