import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Breadcrumb from '../Breadcrumb';

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Breadcrumb', () => {
  it('renders the root button when the path is empty', () => {
    render(<Breadcrumb path="" onNavigate={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'com_fm_breadcrumb_root' })).toBeInTheDocument();
    expect(screen.queryByText('com_fm_breadcrumb_collapsed')).not.toBeInTheDocument();
  });

  it('renders every segment of a short path with a clickable ancestor per segment', async () => {
    const onNavigate = jest.fn();
    const user = userEvent.setup();
    render(<Breadcrumb path="docs/reports" onNavigate={onNavigate} />);

    expect(screen.getByText('docs')).toBeInTheDocument();
    expect(screen.getByText('reports')).toBeInTheDocument();

    // `docs` is the parent of `reports`, so it must be a button.
    // `reports` is the current location, so it must be a plain span
    // (aria-current=page).
    const reports = screen.getByText('reports');
    expect(reports.closest('[aria-current="page"]')).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'docs' }));
    expect(onNavigate).toHaveBeenCalledWith('docs');
  });

  it('collapses the middle segments into an ellipsis button when the path is long', () => {
    const path = 'a/b/c/d/e/f/g';
    render(<Breadcrumb path={path} onNavigate={jest.fn()} />);

    // Root + ellipsis + 2 tail segments.
    expect(screen.queryByText('a')).not.toBeInTheDocument();
    expect(screen.queryByText('b')).not.toBeInTheDocument();
    expect(screen.queryByText('c')).not.toBeInTheDocument();
    expect(screen.queryByText('d')).not.toBeInTheDocument();
    expect(screen.queryByText('e')).not.toBeInTheDocument();
    expect(screen.getByText('f')).toBeInTheDocument();
    expect(screen.getByText('g')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' })).toBeInTheDocument();
  });

  it('opens a popover with the hidden segments when the ellipsis is clicked', async () => {
    const onNavigate = jest.fn();
    const user = userEvent.setup();
    render(<Breadcrumb path="a/b/c/d/e/f" onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));

    const menu = screen.getByRole('menu');
    // Hidden middle segments: a, b, c, d.
    const items = within(menu).getAllByRole('menuitem');
    expect(items).toHaveLength(5); // a, b, c, d, plus the "Show all" action
    expect(within(menu).getByText('a')).toBeInTheDocument();
    expect(within(menu).getByText('b')).toBeInTheDocument();
    expect(within(menu).getByText('c')).toBeInTheDocument();
    expect(within(menu).getByText('d')).toBeInTheDocument();
    expect(within(menu).getByText('com_fm_breadcrumb_collapsed')).toBeInTheDocument();
  });

  it('navigates to a hidden segment when it is clicked in the popover', async () => {
    const onNavigate = jest.fn();
    const user = userEvent.setup();
    render(<Breadcrumb path="a/b/c/d/e/f" onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));
    const menu = screen.getByRole('menu');
    // The folder icon inside each row makes the accessible name longer
    // than the visible label, so we click via text + role scoping.
    const cItem = within(menu).getByText('c').closest('[role="menuitem"]');
    expect(cItem).not.toBeNull();
    await user.click(cItem as HTMLElement);

    expect(onNavigate).toHaveBeenCalledWith('a/b/c');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('expands to show every segment when the "Show all" action is clicked', async () => {
    const onNavigate = jest.fn();
    const user = userEvent.setup();
    render(<Breadcrumb path="a/b/c/d/e/f/g" onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));
    const menu = screen.getByRole('menu');
    // The "Show all" entry reuses the same aria-label key.
    await user.click(within(menu).getAllByText('com_fm_breadcrumb_collapsed')[0]);

    // After expansion, every segment is on screen.
    for (const segment of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
      expect(screen.getByText(segment)).toBeInTheDocument();
    }
  });

  it('closes the popover on Escape and on outside click', async () => {
    const user = userEvent.setup();
    render(<Breadcrumb path="a/b/c/d/e/f" onNavigate={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('resets the expanded state when the user navigates to a new path', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Breadcrumb path="a/b/c/d/e/f/g" onNavigate={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_collapsed' }));
    const menu = screen.getByRole('menu');
    await user.click(within(menu).getAllByText('com_fm_breadcrumb_collapsed')[0]);

    // Navigate to a different path. The component should re-collapse.
    rerender(<Breadcrumb path="x/y/z" onNavigate={jest.fn()} />);
    expect(screen.queryByText('a')).not.toBeInTheDocument();
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.getByText('y')).toBeInTheDocument();
    expect(screen.getByText('z')).toBeInTheDocument();
  });

  it('shows the loading spinner next to the active segment when isLoading is true', () => {
    render(<Breadcrumb path="docs/reports" onNavigate={jest.fn()} isLoading />);
    expect(screen.getByTestId('breadcrumb-loading')).toBeInTheDocument();
  });

  it('does not show the loading spinner when isLoading is false', () => {
    render(<Breadcrumb path="docs/reports" onNavigate={jest.fn()} />);
    expect(screen.queryByTestId('breadcrumb-loading')).not.toBeInTheDocument();
  });

  it('navigates to the root when the root button is clicked', async () => {
    const onNavigate = jest.fn();
    const user = userEvent.setup();
    render(<Breadcrumb path="docs/reports" onNavigate={onNavigate} />);
    await user.click(screen.getByRole('button', { name: 'com_fm_breadcrumb_root' }));
    expect(onNavigate).toHaveBeenCalledWith('');
  });
});
