import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";



@Entity({ name: "users" })
export class Client {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column()
    address: string;

    @Column()
    cellphone: string;

    @OneToMany(() => Order, order => order.client)
    orders: Order[];
}

