import { Model } from 'vue-oop';
import { DocumentNode } from 'graphql';

export default abstract class BaseModel extends Model {
  public createMutation?: string | Function | DocumentNode;

  public updateMutation?: string | Function | DocumentNode;

  public deleteMutation?: string | Function | DocumentNode;

}
