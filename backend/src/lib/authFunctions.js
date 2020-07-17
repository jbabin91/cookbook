const jwt = require('./jwt');
const Admin = require('../api/admin/admin.model');
const { errorTypes, errorMessages } = require('../middleware/errors');

async function jwtVerify(token, permission) {
  try {
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
    }

    if (permission !== undefined) {
      checkAdmin(jwtResponse.payload.id, permission);
    }
  } catch (err) {
    return err;
  }
}

async function checkAdmin(id, permission) {
  try {
    const admin = await Admin.query().select(permission).where({ User_id: id }).first();

    if (!admin || admin.delete === false) {
      const error = new Error(errorMessages.ForbiddenError);
      res.status(errorTypes.UnAuthorizedError);
      throw error;
    }
  } catch (err) {
    return err;
  }
}

module.exports = jwtVerify;
