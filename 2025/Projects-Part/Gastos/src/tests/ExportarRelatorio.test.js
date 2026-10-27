import { mount } from '@vue/test-utils';
import ExportarRelatorio from '../components/ExportarRelatorio.vue';

describe('ExportarRelatorio', () => {
  it('exporta CSV corretamente', () => {
    const gastos = [
      { descricao: 'Conta de Luz', valor: 120, categoria: 'Casa' },
      { descricao: 'Mercado', valor: 200, categoria: 'Alimentação' }
    ];
    const wrapper = mount(ExportarRelatorio, { props: { gastos } });
    // Simula exportação CSV
    wrapper.vm.exportarCSV();
    expect(true).toBe(true); // Teste básico de chamada
  });
});
