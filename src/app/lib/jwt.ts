import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}

export { generateToken, verifyToken };