import { Controller, Post, Get, Patch, Delete, Param, Body, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { Request } from 'express';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  addReview(@Req() req: Request, @Param('productId') productId: number, @Body() createReviewDto: CreateReviewDto) {
    const userId = req.user.id;
    return this.reviewsService.addReview(userId, productId, createReviewDto);
  }

  @Patch(':reviewId')
  updateReview(@Req() req: Request, @Param('reviewId') reviewId: number, @Body() updateReviewDto: UpdateReviewDto) {
    const userId = req.user.id;
    return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  deleteReview(@Req() req: Request, @Param('reviewId') reviewId: number) {
    const userId = req.user.id;
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('product/:productId')
  getProductReviews(@Param('productId') productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}