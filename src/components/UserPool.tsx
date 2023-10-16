import { CognitoUserPool } from "amazon-cognito-identity-js";

interface PoolData {
  UserPoolId: string;
  ClientId: string;
}
const poolData: PoolData = {
  UserPoolId: "us-east-2_GTvFRkxmk",
  ClientId: "15lv0jt2b8l5b65ong22ptlo8"
};

const userPool = new CognitoUserPool(poolData);

export default userPool;