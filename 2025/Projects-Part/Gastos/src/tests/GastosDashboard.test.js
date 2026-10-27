import { mount } from '@vue/test-utils';
import GastosDashboard from '../components/GastosDashboard.vue';

describe('GastosDashboard', () => {
  it('adiciona e remove gastos corretamente', async () => {
    const wrapper = mount(GastosDashboard);
    await wrapper.find('input[placeholder="Descrição"]').setValue('Conta de Luz');
    await wrapper.find('input[placeholder="Valor"]').setValue(120);
    await wrapper.find('input[placeholder="Categoria"]').setValue('Casa');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.gastos.length).toBe(1);
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.gastos.length).toBe(0);
  });
});
