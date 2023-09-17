import { AppError } from '@/infra/main/errors';
import { OutputTokenDto, TokenProviderInterface } from './contracts';

export class JwtTokenProvider implements TokenProviderInterface {
    async generateToken(): Promise<OutputTokenDto> {
        try {
            return {
                access_token: '',
                expires_in: 0,
                refresh_expires: 0,
                token_type: '',
                'not-before-policy': 0,
                scope: '',
                id_token: '',
            };
        } catch (e) {
            throw new AppError('generate token invalid', 400);
        }
    }
}
