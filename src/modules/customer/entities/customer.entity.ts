import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: 'varchar', length: 100 })
    firstName: string; 

    @Column({ type: 'varchar', length: 100 })
    lastName: string; 

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string; 

    @Column({ type: 'varchar', length: 15 })
    phone: string; 

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}
