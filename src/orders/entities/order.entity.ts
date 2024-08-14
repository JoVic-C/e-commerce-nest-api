import { OrderItem } from './order-item.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'peding',
    PAID = 'paid',
    FAILED = 'failed',
}

export type CreateOrderCommand = {
    client_id: number;
    items: {
        product_id: string;
        quantity: number;
        price: number;
    }[];
};

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    total: number;

    @Column()
    client_id: number;

    @Column()
    status: OrderStatus = OrderStatus.PENDING;

    @CreateDateColumn()
    created_at: Date;

    items: OrderItem[]

    static create(input: CreateOrderCommand) {
        const order = new Order();
        order.client_id = input.client_id;
        order.items = input.items.map((item) => {
            const orderItem = new OrderItem();
            orderItem.product_id = item.product_id;
            orderItem.quantity = item.quantity;
            orderItem.price = item.price;
            return orderItem;
        });
        order.total = order.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        return order;
    }
    
    pay() {
        if(this.status === OrderStatus.PAID) {
            throw new Error('Order already paid');
        }
        if(this.status === OrderStatus.FAILED) {
            throw new Error('Order already failed');
        }
        this.status = OrderStatus.PAID;
    }

    fail() {
        if(this.status === OrderStatus.FAILED) {
            throw new Error('Order already failed');
        }

        if(this.status === OrderStatus.PAID) {
            throw new Error('Order already paid');
        }
        this.status = OrderStatus.FAILED;
    }
 
}
