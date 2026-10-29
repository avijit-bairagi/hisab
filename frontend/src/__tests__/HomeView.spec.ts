import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeView from '../views/HomeView.vue';
import vuetify from '../plugins/vuetify';
import { apiService } from '../services/api';

describe('HomeView Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial tools and search input', async () => {
    vi.spyOn(apiService, 'getTools').mockResolvedValue([]);

    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
        stubs: ['router-link']
      }
    });

    await flushPromises();

    expect(wrapper.text()).toContain('Hisab — Everyday calculations, made simple.');
    expect(wrapper.text()).toContain('Calculator');
    expect(wrapper.text()).toContain('DPS Calculator');
    expect(wrapper.text()).toContain('Tax Calculator');
  });

  it('filters tools reactively when search query is entered', async () => {
    vi.spyOn(apiService, 'getTools').mockResolvedValue([]);

    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
        stubs: ['router-link']
      }
    });

    await flushPromises();

    const input = wrapper.find('input');
    await input.setValue('dps');
    await flushPromises();

    expect(wrapper.text()).toContain('DPS Calculator');
    expect(wrapper.text()).not.toContain('Tax Calculator');
  });

  it('shows empty state when no tools match search', async () => {
    vi.spyOn(apiService, 'getTools').mockResolvedValue([]);

    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
        stubs: ['router-link']
      }
    });

    await flushPromises();

    const input = wrapper.find('input');
    await input.setValue('nonexistent_tool_xyz');
    await flushPromises();

    expect(wrapper.text()).toContain('No tools match your search');
    expect(wrapper.text()).toContain('Clear Search');
  });
});
