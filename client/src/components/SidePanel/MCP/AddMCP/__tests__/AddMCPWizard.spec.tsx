import React from 'react';
import { render, screen } from '@testing-library/react';
import AddMCPWizard from '../AddMCPWizard';

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
}));

jest.mock('~/data-provider', () => ({
  useCreateMCPServerMutation: () => ({
    mutate: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock('~/components/Admin/MCPRegistry', () => ({
  RegistryTab: () => <div data-testid="registry-tab-mock" />,
}));

describe('AddMCPWizard', () => {
  it('renders the title and source step', () => {
    render(<AddMCPWizard open onOpenChange={jest.fn()} />);
    expect(screen.getByText('com_user_mcp_wizard_step_source')).toBeInTheDocument();
    expect(screen.getByText('com_user_mcp_wizard_step_config')).toBeInTheDocument();
    expect(screen.getByText('com_user_mcp_wizard_step_review')).toBeInTheDocument();
  });

  it('renders Browse Registry tab by default', () => {
    render(<AddMCPWizard open onOpenChange={jest.fn()} />);
    expect(screen.getByTestId('registry-tab-mock')).toBeInTheDocument();
    expect(screen.getByText('com_user_mcp_wizard_source_browse')).toBeInTheDocument();
    expect(screen.getByText('com_user_mcp_wizard_source_manual')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(<AddMCPWizard open={false} onOpenChange={jest.fn()} />);
    // The OGDialog portal still mounts its content tree for a11y;
    // assert the registry tab mock is NOT shown instead.
    expect(screen.queryByTestId('registry-tab-mock')).not.toBeInTheDocument();
  });
});