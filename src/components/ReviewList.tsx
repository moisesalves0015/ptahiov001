import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-slate-400">
        <p className="text-sm font-medium">Nenhuma avaliação ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4">
          <img 
            src={review.reviewerAvatar} 
            alt={review.reviewerName} 
            className="h-10 w-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900">{review.reviewerName}</h4>
              <span className="text-[10px] font-medium text-slate-400">{review.date}</span>
            </div>
            <div className="mt-1 flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                />
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
