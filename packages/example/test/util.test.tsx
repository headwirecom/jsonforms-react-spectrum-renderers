import { circularReferenceReplacer } from '../src/util';

const stringify = (obj: Object): any =>
  JSON.parse(JSON.stringify(obj, circularReferenceReplacer()));

describe('circularReferenceReplacer', () => {
  test('with emtpy values', () => {
    // given
    const undefObj: any = {
      val: undefined,
    };

    // when
    const undefResult = stringify(undefObj);

    // expect
    expect(undefResult).toEqual({});

    // given
    const nullObj: any = {
      val: null,
    };

    // when
    const nullResult = stringify(nullObj);

    // expect
    expect(nullResult).toEqual(nullObj);

    // given
    const emptyStringObj: any = {
      val: '',
    };

    // when
    const emptyStringRes = stringify(emptyStringObj);

    // expect
    expect(emptyStringRes).toEqual(emptyStringObj);

    // given
    const emptyObj: any = {};

    // when
    const emptyObjRes = stringify(emptyObj);

    // then
    expect(emptyObjRes).toEqual(emptyObj);
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
    expect(result).toEqual(obj);
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

    obj.a.prop2 = obj.a;

    obj.b = {
      foo: obj.a,
      bar: obj.a.nested,
    };

    // when
    const result = stringify(obj);

    // then
    expect(result.a).toEqual({
      prop: 'foo',
      prop2: {
        $ref: '#/a',
      },
      nested: {
        prop: 'bar',
      },
    });
    expect(result.b).toEqual({
      foo: {
        $ref: '#/a',
      },
      bar: {
        $ref: '#/a/nested',
      },
    });
  });

  test('with root reference', () => {
    // given
    const obj: any = {
      a: {
        prop: 'foo',
      },
    };
    obj.b = obj;

    // when
    const result = stringify(obj);

    // then
    expect(result.a).toEqual({
      prop: 'foo',
    });
    expect(result.b).toEqual({
      $ref: '#/',
    });
  });

  test('with equal object', () => {
    // given
    const obj: any = {
      a: {
        prop: 'foo',
      },
    };
    obj.b = { ...obj.a };

    // when
    const result = stringify(obj);

    // then
    expect(result).toEqual(obj);
  });
});
