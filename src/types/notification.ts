import { Heart, Shield, Award, LogIn, MessageCircle, Star, Target } from "lucide-react";

export interface Notification {
  id: number;
  type: 'donation' | 'milestone' | 'verification' | 'achievement' | 'message' | 'login';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: React.ComponentType<{ size?: number }>;
  amount?: string;
  donor?: string;
  progress?: string;
  badge?: string;
  sender?: string;
  location?: string;
}

export const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'donation',
    title: 'New Donation Received!',
    message: 'Sarah M. just donated ₦5,000 to your campaign.',
    amount: '₦5,000',
    time: '2 minutes ago',
    unread: true,
    icon: Heart,
    donor: 'Sarah M.'
  },
  {
    id: 2,
    type: 'milestone',
    title: '🎉 Campaign Milestone Reached!',
    message: 'Congratulations! Your campaign has reached 75% of its funding goal.',
    progress: '75%',
    time: '15 minutes ago',
    unread: true,
    icon: Target
  },
  {
    id: 3,
    type: 'verification',
    title: 'Account Verification Complete',
    message: 'Great news! Your identity verification has been approved.',
    time: '1 hour ago',
    unread: false,
    icon: Shield
  },
  {
    id: 4,
    type: 'donation',
    title: 'New Donation Received!',
    message: 'Sarah M. just donated $50 to your "Help Build Community Garden" campaign.',
    amount: '$50',
    time: '2 minutes ago',
    unread: true,
    icon: Heart,
    donor: 'Sarah M.'
  },
  {
    id: 5,
    type: 'milestone',
    title: '🎉 Campaign Milestone Reached!',
    message: 'Congratulations! Your campaign has reached 75% of its funding goal.',
    progress: '75%',
    time: '15 minutes ago',
    unread: true,
    icon: Target
  },
  {
    id: 6,
    type: 'verification',
    title: 'Account Verification Complete',
    message: 'Great news! Your identity verification has been approved. You can now withdraw funds.',
    time: '1 hour ago',
    unread: false,
    icon: Shield
  },
  {
    id: 7,
    type: 'achievement',
    title: 'Badge Unlocked: Rising Star',
    message: 'You&apos;ve earned the "Rising Star" badge for reaching 50+ backers in your first campaign!',
    time: '2 hours ago',
    unread: true,
    icon: Star,
    badge: 'Rising Star'
  },
  {
    id: 8,
    type: 'message',
    title: 'Heartfelt Message from Backer',
    message: '"Your project means so much to our community. Thank you for making a difference!" - Alex K.',
    time: '3 hours ago',
    unread: true,
    icon: MessageCircle,
    sender: 'Alex K.'
  },
  {
    id: 9,
    type: 'login',
    title: 'New Login Detected',
    message: 'We noticed a login from a new device in New York, NY. Was this you?',
    time: '4 hours ago',
    unread: false,
    icon: LogIn,
    location: 'New York, NY'
  },
  {
    id: 10,
    type: 'donation',
    title: 'Anonymous Donation',
    message: 'Someone chose to donate $100 anonymously to your campaign with a special message.',
    amount: '$100',
    time: '5 hours ago',
    unread: false,
    icon: Heart,
    donor: 'Anonymous'
  },
  {
    id: 11,
    type: 'achievement',
    title: 'Badge Unlocked: Community Hero',
    message: 'You&apos;ve earned the "Community Hero" badge for helping 3 other campaigns reach their goals!',
    time: '1 day ago',
    unread: false,
    icon: Award,
    badge: 'Community Hero'
  }
];