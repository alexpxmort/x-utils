import { expect } from 'chai';
import { mapTo } from '../../src/maps';

describe('mapTo()', () => {
  it('Deve retornar com as chaves mapeadas de acordo com a configuração passada.', () => {
    const data: any = {
      id: 1,
      label: 'label',
      Business_Key: 'businessKey'
    };
    const expected: any = {
      id: 1,
      label: 'label',
      businessKey: 'businessKey'
    };
    expect(
      mapTo(data, {
        Business_Key: 'businessKey'
      })
    ).to.eql(expected);
  });

  it('Deve retornar com as chaves mapeadas de acordo com a configuração passada incluindo função aplicada ao objeto.', () => {
    const data: any = {
      id: 1,
      label: 'label',
      Business_Key: 'businessKey'
    };
    const expected: any = {
      id: 1,
      label: 'label',
      businessKey: 'BUSINESSKEY'
    };
    expect(
      mapTo(data, {
        Business_Key: ['businessKey', (value: any) => value.toUpperCase()]
      })
    ).to.eql(expected);
  });

  it('Deve retornar o objeto aplicando uma função específica em determinada chave.', () => {
    const data: any = {
      id: 1,
      label: 'label',
      company: {
        name: 'Jonh',
        address_offers: 'jonh@doe'
      }
    };
    const expected: any = {
      id: 1,
      label: 'label',
      company: {
        name: 'Jonh',
        addressOffers: 'jonh@doe'
      }
    };
    expect(
      mapTo(data, {
        company: (value: any) =>
          mapTo(value, { address_offers: 'addressOffers' })
      })
    ).to.eql(expected);
  });

  const testsFalsy: any[] = [null, undefined, {}];
  testsFalsy.forEach((data) => {
    it(`Deve retornar {} quando o valor é ${data}.`, () => {
      expect(mapTo(data)).to.eql({});
    });
  });

  it('Deve retornar o mesmo objeto caso não tenha configuração do mapeamento de objetos e não foi configurada exclusão de dados.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    expect(mapTo(data)).to.eql(data);
    expect(mapTo(data, {})).to.eql(data);
  });

  it('Deve retornar com as chaves mapeadas de acordo com a configuração passada e configurado quais chaves devem ser removidas.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    const expected: any = {
      id: 1,
      label: 'label',
      businessKey: 'businessKey',
      businessDescription: 'businessDescription'
    };
    expect(
      mapTo(
        data,
        {
          Business_Key: 'businessKey',
          business_description: 'businessDescription'
        },
        ['name', 'type']
      )
    ).to.eql(expected);
  });

  it('Deve retornar o objeto sem alguns dados de acordo com a configuração.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    const expected: any = {
      id: 1,
      label: 'label',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    expect(mapTo(data, {}, ['name', 'type'])).to.eql(expected);
  });

  it('Deve retornar o objeto mantendo somente os campos definidos e mapeando os mesmos.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    const expected: any = {
      businessDescription: 'businessDescription',
      type: 'type'
    };
    expect(
      mapTo(
        data,
        { business_description: 'businessDescription' },
        ['business_description', 'type'],
        'keep'
      )
    ).to.eql(expected);
  });

  it('Deve retornar o objeto mantendo somente os campos definidos.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    const expected: any = {
      name: 'name',
      type: 'type'
    };
    expect(mapTo(data, {}, ['name', 'type'], 'keep')).to.eql(expected);
  });

  it('Deve retornar o objeto mantendo somente os campos definidos e mapeando para um campo que não existe.', () => {
    const data: any = {
      id: 1,
      name: 'name',
      label: 'label',
      type: 'type',
      Business_Key: 'businessKey',
      business_description: 'businessDescription'
    };
    const expected: any = {
      business_description: 'businessDescription',
      type: 'type'
    };
    expect(
      mapTo(
        data,
        { naoExiste: 'businessDescription' },
        ['business_description', 'type'],
        'keep'
      )
    ).to.eql(expected);
  });
});
