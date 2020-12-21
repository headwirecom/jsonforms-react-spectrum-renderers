import { circularReferenceReplacer } from '../src/util';

const stringify = (obj: any) =>
  JSON.stringify(obj, circularReferenceReplacer());

describe('circularReferenceReplacer', () => {
  test('with emtpy values', () => {
    // given
    const undefObj: any = {
      val: undefined,
    };

    // when
    const undefResult = stringify(undefObj);

    // expect
    expect(undefResult).toEqual(`{}`);

    // given
    const nullObj: any = {
      val: null,
    };

    // when
    const nullResult = stringify(nullObj);

    // expect
    expect(nullResult).toEqual(`{"val":null}`);

    // given
    const emptyStringObj: any = {
      val: '',
    };

    // when
    const emptyStringRes = stringify(emptyStringObj);

    // expect
    expect(emptyStringRes).toEqual(`{"val":""}`);
  });

  test('with non-circular objects', () => {
    // given
    const obj: any = {
      a: 'foo',
      b: 'bar',
      nested: {
        c: 'baz',
      },
    };

    // when
    const result = stringify(obj);

    // then
    expect(result).toEqual(`{"a":"foo","b":"bar","nested":{"c":"baz"}}`);
  });

  test('with circular object', () => {
    // given
    const obj: any = {
      a: {
        prop: 'foo',
        nested: {
          prop: 'bar',
        },
      },
    };

    obj.a['prop2'] = obj.a;

    obj['b'] = {
      foo: obj.a,
      bar: obj.a.nested,
    };

    // when
    const result = stringify(obj);

    // then
    expect(result).toEqual(
      `{"a":{"prop":"foo","nested":{"prop":"bar"},"prop2":{"$ref":"#/a"}},"b":{"foo":{"$ref":"#/a"},"bar":{"$ref":"#/a/nested"}}}`
    );
  });

  test('with root reference', () => {
    // given
    const obj: any = {
      a: {
        prop: 'foo',
      },
    };

    obj['b'] = obj;

    // when
    const result = stringify(obj);

    // then
    expect(result).toEqual(`{"a":{"prop":"foo"},"b":"#/"}`);
  });
});
