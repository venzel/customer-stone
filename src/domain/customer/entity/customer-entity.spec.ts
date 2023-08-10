import { Customer } from './customer.entity';

describe('Customer unit tests', () => {
    it('should throw an error when the document is negative', () => {
        expect(() => {
            new Customer(null, -1, 'Tiago Rizzo');
        }).toThrowError('O documento não pode ser negativo');
    });

    it('should throw an error when name is greater than 20', () => {
        expect(() => {
            new Customer(null, 20202020, 'Tiago Rizzo da Silva Campos Neto');
        }).toThrowError('O nome não pode conter mais de 20 caracteres');
    });
});
