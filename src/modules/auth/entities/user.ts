import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text", {unique: true})
    email: string;

    @Column("text", { select: false })
    password: string;

    @Column("text", {array: true, default: ['user']})
    roles: string[];

    @Column("bool", {default: true})
    isActive: boolean;
    
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
