import { mount } from '@vue/test-utils';
import Login from '../components/Login.vue';

describe('Login', () => {
  it('autentica usuário válido', async () => {
    const wrapper = mount(Login);
    await wrapper.find('input[placeholder="Usuário"]').setValue('admin');
    await wrapper.find('input[placeholder="Senha"]').setValue('1234');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().autenticado).toBeTruthy();
  });
  it('recusa usuário inválido', async () => {
    const wrapper = mount(Login);
    await wrapper.find('input[placeholder="Usuário"]').setValue('user');
    await wrapper.find('input[placeholder="Senha"]').setValue('wrong');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.erro).toBe(true);
  });
});
