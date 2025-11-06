import PaymentRepository from "../repositories/payment.repository.js";

class PaymentService {
    constructor() {
        this.repository = new PaymentRepository();
    }

    async getAllPayments(req) {
        try {
            return await this.repository.getAllPayments(req);
        } catch (error) {
            throw new Error("Error fetching payments: " + error.message);
        }
    }
    async getPaymentById(id) {
        try {
            return await this.repository.getPaymentById(id);
        } catch (error) {
            throw new Error("Error fetching payment: " + error.message);
        }
    }

    async createPayment(data) {
        try {
            return await this.repository.createPayment(data);
        } catch (error) {
            throw new Error("Error creating payment: " + error.message);
        }
    }

    async editPayment(id, data) {
        try {
            return await this.repository.editPayment(id, data);
        } catch (error) {
            throw new Error("Error updating payment: " + error.message);
        }
    }

    async deletePayment(id) {
        try {
            return await this.repository.deletePayment(id);
        } catch (error) {
            throw new Error("Error deleting payment: " + error.message);
        }
    }
}

export default PaymentService;