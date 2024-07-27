import { AuthChecker } from 'type-graphql';
import { ContextType } from '../../types';

const authChecker: AuthChecker<ContextType> = ({ context }, roles) => {
  if (!context.currentUser) {
    return false;
  }

  if (roles.length > 0 && !roles.includes(context.currentUser.role)) {
    return false;
  }

  return true;
};

export default authChecker;
