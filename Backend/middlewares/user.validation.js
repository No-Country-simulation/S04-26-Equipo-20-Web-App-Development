import { body, validationResult } from "express-validator";

export const validateUser = [

    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Formato de email inválido")
        .normalizeEmail(),

    body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .trim(),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isStrongPassword({
            minLength: 6,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número"),

    body("rolId")
        .notEmpty()
        .withMessage("El rol es obligatorio")
        .isNumeric()
        .withMessage("El rol debe ser numérico"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array()
            });
        }

        next();
    }
];