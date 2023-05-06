import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ConnectAccountDocument = HydratedDocument<ConnectAccount>;

@Schema({ timestamps: true })
export class ConnectAccount extends Document {
	constructor(partial: Partial<ConnectAccount>) {
		super();
		Object.assign(this, partial);
	}

	@Prop({
		immutable: true,
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: User.name
	})
	user: User;

	@Prop({
		immutable: true,
		required: true
	})
	connectAccountId: string;
}

export const ConnectAccountSchema = SchemaFactory.createForClass(ConnectAccount);
