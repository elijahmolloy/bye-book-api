import { Test, TestingModule } from '@nestjs/testing';
import { IsbndbService } from './isbndb.service';

describe('IsbndbService', () => {
	let service: IsbndbService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [IsbndbService]
		}).compile();

		service = module.get<IsbndbService>(IsbndbService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
