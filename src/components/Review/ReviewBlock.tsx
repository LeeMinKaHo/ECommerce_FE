import { Reviews } from '@/types/reviews';
import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react'; // Đã có lucide-react trong package.json
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NotificationService from '@/service/NotificationService';
import { toast } from 'sonner';

interface ReviewBlockProps {
  review: Reviews;
}

export const ReviewBlock: React.FC<ReviewBlockProps> = ({ review }) => {
  const user = useSelector((state: RootState) => state.user);
  const [likesCount, setLikesCount] = useState(review.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    review.likes?.includes(user._id || '') || false
  );
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user._id) {
      toast.error('Vui lòng đăng nhập để thích đánh giá này');
      return;
    }

    try {
      setLoading(true);
      const result = await NotificationService.likeReview(review._id);
      setIsLiked(result.liked);
      setLikesCount(result.likesCount);

      if (result.liked) {
        toast.success('Đã thích đánh giá');
      }
    } catch (error) {
      console.error('Like failed', error);
      toast.error('Không thể thực hiện thao tác');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-start justify-between">
        {/* Avatar và tên */}
        <div className="flex items-center gap-4">
          <img
            src={review.user.avatar || '/default-avatar.png'}
            className="h-12 w-12 rounded-full border border-gray-200 object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{review.user.name}</p>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={index < review.star ? '#FFD44D' : '#E5E7EB'}
                  className="h-4 w-4"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.173L12 18.896l-7.334 3.874 1.4-8.173L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Nút Like */}
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300 ${
            isLiked
              ? 'border border-blue-200 bg-blue-50 text-blue-600'
              : 'border border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <ThumbsUp size={16} className={isLiked ? 'fill-current' : ''} />
          <span className="text-xs font-medium">{likesCount}</span>
        </button>
      </div>

      <div>
        <p className="mb-1 font-bold text-gray-900">{review.headline}</p>
        <p className="text-sm leading-relaxed text-gray-600">
          {review.content}
        </p>
      </div>
    </div>
  );
};
