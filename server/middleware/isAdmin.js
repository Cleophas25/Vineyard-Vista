export const isAdmin = (req, res, next) => {
      if (user && user.isAdmin) {
        next();
      } else {
        res.status(401).send({ message: "Invalid Admin Token" });
      }
};

export default isAdmin