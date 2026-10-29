import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToolCard from '../components/ToolCard.vue';
import type { ToolDefinition } from '../types';
import vuetify from '../plugins/vuetify';

const mockTool: ToolDefinition = {
  id: 'calculator',
  name: 'Standard Calculator',
  route: '/tools/calculator',
  description: 'Fast math evaluation',
  icon: 'mdi-calculator',
  category: 'GENERAL',
  keywords: ['math', 'calculator'],
  status: 'AVAILABLE'
};

describe('ToolCard Component', () => {
  it('renders tool title and description correctly', () => {
    const wrapper = mount(ToolCard, {
      props: { tool: mockTool },
      global: {
        plugins: [vuetify],
        stubs: ['router-link']
      }
    });

    expect(wrapper.text()).toContain('Standard Calculator');
    expect(wrapper.text()).toContain('Fast math evaluation');
    expect(wrapper.text()).toContain('GENERAL');
  });

  it('is clickable to route and does not contain a separate Open Tool button', () => {
    const wrapper = mount(ToolCard, {
      props: { tool: mockTool },
      global: {
        plugins: [vuetify],
        stubs: ['router-link']
      }
    });

    expect(wrapper.text()).not.toContain('Open Tool');
    expect(wrapper.findComponent({ name: 'VCard' }).props('to')).toBe('/tools/calculator');
  });
});
