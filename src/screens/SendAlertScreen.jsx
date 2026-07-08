import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
  Platform,
  Modal,
  Pressable
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '../theme/colors';
import { sendalertstyles as styles } from '../theme/styles';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

function DeliveryRow({ label, icon, value, onToggle }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={colors.tabActive} />
        <Text style={styles.rowText}>{label}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: '#0d632c' }}
        thumbColor={value ? '#3a7d30' : undefined}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const ALERT_TYPES = ['Normal', 'Urgent', 'Emergency'];
const ALERT_TYPE_COLORS = {
  Normal: colors.tabActive,
  Urgent: '#ff8400',
  Emergency: '#ff0101'
};
const RECIPIENT_OPTIONS = ['All', 'Volunteers ', 'Specific '];

function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.selectText}>{label(value)}</Text>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdownMenu}>
            {options.map((option) => {
              const active = option === value;
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      active && styles.dropdownItemTextActive
                    ]}
                  >
                    {label(option)}
                  </Text>
                  {active && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.tabActive}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function SendAlertScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipientType, setRecipientType] = useState('All');
  const [userSearch, setUserSearch] = useState('');
  const [alertType, setAlertType] = useState('Normal');
  const [delivery, setDelivery] = useState({ inApp: true, push: false, email: false });
  const [scheduled, setScheduled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDelivery = (key) => {
    setDelivery((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const canSend = title.trim().length > 0 && message.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;

    const payload = {
      title,
      message,
      recipientType,
      recipientSearch: recipientType === 'Specific ' ? userSearch : null,
      alertType,
      delivery,
      scheduledFor: scheduled ? date.toISOString() : null
    };

    console.log('Sending alert:', payload);
    
    // Navigate back to Admin screen after "sending"
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>Send Alert</Text>
          <Text style={styles.subtitle}>Create and send a notification</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.sectionTitle}>Alert Details</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} placeholder="Alert title" placeholderTextColor={colors.textMuted} value={title} onChangeText={setTitle} />
          <Text style={styles.label}>Message</Text>
          <TextInput style={styles.textArea} placeholder="Write your message..." placeholderTextColor={colors.textMuted} value={message} onChangeText={setMessage} multiline maxLength={500} />
          <Text style={styles.counter}>{message.length}/500</Text>
          <Text style={styles.label}>Alert Type</Text>
          <View style={styles.pillRow}>
            {ALERT_TYPES.map((type) => {
              const active = alertType === type;
              return (
                <TouchableOpacity key={type} style={[styles.pill, active && { backgroundColor: ALERT_TYPE_COLORS[type], borderColor: ALERT_TYPE_COLORS[type] }]} onPress={() => setAlertType(type)}>
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Recipients</Text>
          <Dropdown label={(v) => (v === 'All' ? 'All Users' : v)} options={RECIPIENT_OPTIONS} value={recipientType} onChange={setRecipientType} />
          {recipientType === 'Specific ' && <TextInput style={styles.input} placeholder="🔍 Search users..." placeholderTextColor={colors.textMuted} value={userSearch} onChangeText={setUserSearch} />}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Delivery Methods</Text>
          <DeliveryRow label="In-App Notification" icon="notifications-outline" value={delivery.inApp} onToggle={() => toggleDelivery('inApp')} />
          <DeliveryRow label="Push Notification" icon="phone-portrait-outline" value={delivery.push} onToggle={() => toggleDelivery('push')} />
          <DeliveryRow label="Email" icon="mail-outline" value={delivery.email} onToggle={() => toggleDelivery('email')} />
        </Card>

        <Card>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Schedule for later</Text>
            <Switch value={scheduled} onValueChange={setScheduled} trackColor={{ false: colors.border, true: '#0d632c' }} thumbColor={scheduled ? '#3a7d30' : undefined} />
          </View>
          {scheduled && (
            <>
              <TouchableOpacity style={styles.selectBox} onPress={() => setShowPicker(true)}>
                <Text style={styles.selectText}>{date.toLocaleString()}</Text>
                <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              {showPicker && <DateTimePicker value={date} mode="datetime" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChangeDate} />}
            </>
          )}
        </Card>

        <TouchableOpacity style={[styles.sendButton, !canSend && styles.sendButtonDisabled]} onPress={handleSend} disabled={!canSend}>
          <Text style={styles.sendButtonText}>Send Alert</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}