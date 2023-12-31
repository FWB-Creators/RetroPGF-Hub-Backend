import jwt, { JwtPayload } from "jsonwebtoken";
import * as sessionService from "@/service/session.service";
export const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("Please Define JWT_SECRET");
}

export interface customJwtPayload extends JwtPayload {
    email: string;
    uuid: string;
    exp?: number | undefined;
    iat?: number | undefined;
}

export const Validate = (token: string) => {
    const decoded = jwt.verify(token, secret) as customJwtPayload;
    return decoded
}

export const generateToken = (email: string, uuid: string) => {
    const token = jwt.sign({ email: email, uuid: uuid }, secret, {
        expiresIn: "2d", // 2 days
    });
    return token;
};