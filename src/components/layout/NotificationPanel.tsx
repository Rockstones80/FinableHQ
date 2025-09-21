
import { Bell, X, } from 'lucide-react';
import { Notification } from '@/types/notification';


interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  }

export default function NotificationPanel({ 
    isOpen, 
    onClose, 
    notifications, 
    setNotifications 
  }: NotificationPanelProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTypeStyles = (type: Notification['type']): string => {
    const styles: Record<Notification['type'], string> = {
      donation: 'text-pink-600 bg-pink-100/80 backdrop-blur-sm',
      milestone: 'text-green-600 bg-green-100/80 backdrop-blur-sm',
      verification: 'text-blue-600 bg-blue-100/80 backdrop-blur-sm',
      achievement: 'text-purple-600 bg-purple-100/80 backdrop-blur-sm',
      message: 'text-orange-600 bg-orange-100/80 backdrop-blur-sm',
      login: 'text-gray-600 bg-gray-100/80 backdrop-blur-sm'
    };
    return styles[type];
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationDetails = (notification: Notification) => {
    switch(notification.type) {
      case 'donation':
        return (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-green-600">{notification.amount}</span>
            <span className="text-xs text-gray-400">from {notification.donor}</span>
          </div>
        );
      case 'milestone':
        return (
          <div className="mt-2">
            <div className="w-full bg-gray-200/60 backdrop-blur-sm rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: notification.progress }}
              ></div>
            </div>
            <span className="text-xs text-green-600 font-medium">{notification.progress} funded</span>
          </div>
        );
      case 'achievement':
        return (
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100/80 text-purple-800 backdrop-blur-sm">
              🏆 {notification.badge}
            </span>
          </div>
        );
      case 'message':
        return (
          <div className="mt-1">
            <span className="text-xs text-gray-500">Message from {notification.sender}</span>
          </div>
        );
      case 'login':
        return (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">📍 {notification.location}</span>
            <button className="text-xs text-blue-600 hover:text-blue-700 underline">
              Secure Account
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Notification Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed right-0 top-0 z-50 w-96 bg-white/40 backdrop-blur-md rounded-xl shadow-2xl flex flex-col"
            style={{ height: '100vh' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 flex items-center justify-between bg-gradient-to-r from-green-50/50 to-white/50 backdrop-blur-sm rounded-t-xl flex-shrink-0">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  {Number(unreadCount) === 0 ? "" : `${unreadCount} new ${unreadCount === 1 ? 'notification' : 'notifications'}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer px-2 py-1 rounded-md hover:bg-green-100/50 backdrop-blur-sm transition-all"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 cursor-pointer hover:text-red-500 transition-colors backdrop-blur-sm" title="close"
                >
                  <X size={25} />
                </button>
              </div>
            </div>

            {/* Notifications List - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No notifications yet</p>
                  <p className="text-sm">You&apos;ll see donation updates and campaign milestones here</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-white/10 hover:bg-white/30 transition-all cursor-pointer group relative backdrop-blur-sm ${
                        notification.unread ? 'bg-green-100/30 border-l-4 border-l-green-400' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${getTypeStyles(notification.type)} flex-shrink-0`}>
                          <IconComponent size={16} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-medium text-gray-900 ${notification.unread ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 animate-pulse" />
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                            {notification.message}
                          </p>

                          {/* Notification Details */}
                          {getNotificationDetails(notification)}

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 cursor-pointer hover:text-red-600 rounded transition-all backdrop-blur-lg"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {/* {notifications.length > 0 && (
              <div className="p-3 border-t border-white/20 bg-gray-50/60 backdrop-blur-sm rounded-b-xl flex-shrink-0">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-100/50 transition-all backdrop-blur-sm">
                  View Campaign Dashboard
                </button>
              </div>
            )} */}
          </div>
        </>
      )}
    </div>
  );
}