import { Body, Controller, Post } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  createRental(@Body('userId') userId: number, @Body('bookId') bookId: number) {
    return this.rentalService.createRental(userId, bookId);
  }
}
