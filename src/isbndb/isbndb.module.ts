import { Module } from '@nestjs/common';
import { IsbndbService } from './isbndb.service';

@Module({
	providers: [IsbndbService]
})
export class IsbndbModule {}
