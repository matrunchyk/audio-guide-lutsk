import { Model } from 'vue-oop';
import { DocumentNode } from 'graphql';

export default abstract class BaseModel extends Model {
  declare public createMutation?: string | Function | DocumentNode;

  declare public updateMutation?: string | Function | DocumentNode;

  declare public deleteMutation?: string | Function | DocumentNode;
}
