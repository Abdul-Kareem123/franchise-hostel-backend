import * as jwt from  'jsonwebtoken';
import { response } from '../helper/commonResponseHandler';
import { clientError, errorMessage } from '../helper/ErrorMessage';

const activity = 'token';

/**
 * @author Abdul kareem
 * @date 12-08-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to token creation
 */

export let CreateJWTToken = (data: any = {}) => {
    let tokenData: {
        userId?: string;
        userName?: string;
        role?: string;
    } = {};
    
    if (data?.id) {
        tokenData.userId = data.id; 
    }
    if (data?.name) {
        tokenData.userName = data.name; 
    }
    if (data?.role) {
        tokenData.role = data.role;
    }
    
    return jwt.sign(tokenData, 'pixaliveFranchise', { expiresIn: '365D' });
};



/**
 * @author Abdul kareem
 * @date 22-09-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Chech the session and Verify the token
 */
export let checkSession = (allowedRoles?: Array<'user' | 'owner' | 'admin'>) => {
  return async (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
      return response(req, res, activity, 'Level-1', 'verify-token', false, 401, { message: 'Token missing'}, errorMessage.notFound);
    }
    
    try {
      const parts = token.split(' ');
      if (parts.length !== 2 || parts[0].trim() !== "Bearer") {
        return res.status(401).json({ message: 'Invalid token format' });
      }

      const tokenValue = parts[1].trim();
      const tokendata = jwt.verify(tokenValue, 'pixaliveFranchise') as {
        userId: string;
        userName?: string;
        role?: string;
      };
      if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(tokendata.role as any)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.body.loginId = tokendata.userId;
      req.body.loginUserName = tokendata.userName;
      req.body.createdBy = tokendata.userName;
      req.body.createdOn = new Date();
      req.body.modifiedBy = tokendata.userName;
      req.body.modifiedOn = new Date();

      next();
    } catch (error: any) {
        return response(req, res, activity, 'Level-1', 'verify-token', false, 401, { message: 'Unauthorized'}, errorMessage.internalServer, error.message);
    }
  };
};


