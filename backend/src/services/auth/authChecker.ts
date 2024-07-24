import { AuthChecker } from 'type-graphql';
import { ContextType } from '../../types';

const authChecker: AuthChecker<ContextType> = ({ context }, roles) => {
  // Si aucun utilisateur n'est trouvé dans le contexte, l'accès est refusé
  if (!context.currentUser) {
    return false;
  }

  // Si des rôles sont définis et que l'utilisateur n'a pas ces rôles, l'accès est refusé
  if (roles.length > 0 && !roles.includes(context.currentUser.role)) {
    return false;
  }

  // Si toutes les vérifications passent, l'accès est accordé
  return true;
};

export default authChecker;
