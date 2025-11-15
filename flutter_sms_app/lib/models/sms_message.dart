import 'package:hive/hive.dart';

part 'sms_message.g.dart';

@HiveType(typeId: 0)
class SmsMessage extends HiveObject {
  @HiveField(0)
  String sender;

  @HiveField(1)
  String message;

  @HiveField(2)
  DateTime timestamp;

  @HiveField(3)
  bool isRead;

  @HiveField(4)
  String? messageId;

  SmsMessage({
    required this.sender,
    required this.message,
    required this.timestamp,
    this.isRead = false,
    this.messageId,
  });

  Map<String, dynamic> toJson() => {
        'sender': sender,
        'message': message,
        'timestamp': timestamp.toIso8601String(),
        'isRead': isRead,
        'messageId': messageId,
      };

  factory SmsMessage.fromJson(Map<String, dynamic> json) => SmsMessage(
        sender: json['sender'],
        message: json['message'],
        timestamp: DateTime.parse(json['timestamp']),
        isRead: json['isRead'] ?? false,
        messageId: json['messageId'],
      );
}
