import Joi from "joi";
import jwtLib from "jsonwebtoken";

// Auth middleware
export const auth = (req, res, next) => {
    console.log("Auth middleware");
    next();
};

// Logger middleware
export const logger = (req, res, next) => {
    console.log("Logger middleware");
    next();
};

// Validate middleware
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((d) => d.message),
            });
        }
        next();
    };
};

// JWT middleware
export const jwt = () => {
    return (req, res, next) => {
        const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        try {
            const decoded = jwtLib.verify(token, process.env.JWT_SECRET || "secretkey");
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    };
};


export default {
    auth,
    logger,
    validate,
    jwt,
};
