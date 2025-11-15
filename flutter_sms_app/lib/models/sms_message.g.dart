// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sms_message.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class SmsMessageAdapter extends TypeAdapter<SmsMessage> {
  @override
  final int typeId = 0;

  @override
  SmsMessage read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return SmsMessage(
      sender: fields[0] as String,
      message: fields[1] as String,
      timestamp: fields[2] as DateTime,
      isRead: fields[3] as bool,
      messageId: fields[4] as String?,
    );
  }

  @override
  void write(BinaryWriter writer, SmsMessage obj) {
    writer
      ..writeByte(5)
      ..writeByte(0)
      ..write(obj.sender)
      ..writeByte(1)
      ..write(obj.message)
      ..writeByte(2)
      ..write(obj.timestamp)
      ..writeByte(3)
      ..write(obj.isRead)
      ..writeByte(4)
      ..write(obj.messageId);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is SmsMessageAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
