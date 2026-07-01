import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistryCard from '../RegistryCard';
import type { RegistryListItem } from 'librechat-data-provider';

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
}));

const sampleItem: RegistryListItem = {
  name: 'io.example/foo',
  title: 'Foo',
  description: 'A test server',
  version: '1.2.3',
  repositoryUrl: 'https://github.com/example/foo',
  transports: ['streamable-http', 'sse'],
  oauthHint: false,
};

describe('RegistryCard', () => {
  it('renders title, name, description, and version', () => {
    render(<RegistryCard item={sampleItem} onSelect={jest.fn()} />);
    expect(screen.getByText('Foo')).toBeInTheDocument();
    expect(screen.getByText('io.example/foo')).toBeInTheDocument();
    expect(screen.getByText('A test server')).toBeInTheDocument();
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });

  it('renders a badge for each transport', () => {
    render(<RegistryCard item={sampleItem} onSelect={jest.fn()} />);
    expect(
      screen.getByText('com_admin_mcp_registry_transport_streamable_http'),
    ).toBeInTheDocument();
    expect(screen.getByText('com_admin_mcp_registry_transport_sse')).toBeInTheDocument();
  });

  it('renders the OAuth badge when oauthHint is true', () => {
    render(
      <RegistryCard item={{ ...sampleItem, oauthHint: true }} onSelect={jest.fn()} />,
    );
    expect(screen.getByText('com_admin_mcp_registry_oauth_required')).toBeInTheDocument();
  });

  it('calls onSelect with the item when the card is clicked', () => {
    const onSelect = jest.fn();
    render(<RegistryCard item={sampleItem} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(sampleItem);
  });

  it('does not propagate clicks from the repository link to onSelect', () => {
    const onSelect = jest.fn();
    render(<RegistryCard item={sampleItem} onSelect={onSelect} />);
    const repoLink = screen.getByRole('link');
    fireEvent.click(repoLink);
    expect(onSelect).not.toHaveBeenCalled();
  });
});