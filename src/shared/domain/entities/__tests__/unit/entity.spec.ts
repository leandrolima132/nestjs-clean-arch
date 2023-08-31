import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: string;
};

class StubEntity extends Entity<StubProps> {}
describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = {
      prop1: '1',
      prop2: '2',
    };

    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should accept a valid uuid', () => {
    const props = {
      prop1: '1',
      prop2: '2',
    };
    const id = '11c4a88b-80d5-45b1-9f08-f9f4e1922cdc';

    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('Should convert a entity to a Javascript Object', () => {
    const props = {
      prop1: '1',
      prop2: '2',
    };
    const id = '11c4a88b-80d5-45b1-9f08-f9f4e1922cdc';

    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
