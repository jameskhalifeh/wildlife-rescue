import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { adminStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

const OVERVIEW = [
  { label: 'Missions\nToday',      value: '11', icon: 'flag-outline',       color: colors.tabActive },
  { label: 'Completed',            value: '8',  icon: 'checkmark-circle-outline', color: colors.delivered },
  { label: 'Active\nNow',          value: '3',  icon: 'pulse-outline',       color: colors.accepted },
  { label: 'Volunteers\nOnline',   value: '12', icon: 'people-outline',      color: colors.high },
];

const QUICK_ACTIONS = [
  { label: 'Create Mission',       icon: 'add-circle-outline',    route: 'NewMission',  bg: colors.primaryBtn },
  { label: 'Manage Volunteers',    icon: 'people-outline',        route: 'Volunteers',  bg: '#1e3a6a' },
  { label: 'View Reports',         icon: 'bar-chart-outline',     route: null,          bg: '#3a2d6a' },
  { label: 'Send Alert',           icon: 'notifications-outline', route: null,          bg: '#6a2d2d' },
];

const PENDING = [
  { id: 'M1290', animal: 'Injured Deer',  emoji: '🦌', emojiColor: '#e4dcc0', location: 'Bekaa Valley',        urgency: 'High',   since: '5 min ago' },
  { id: 'M1291', animal: 'Trapped Fox',   emoji: '🦊', emojiColor: '#e8d8c0', location: 'Akkar, North Lebanon', urgency: 'Medium', since: '18 min ago' },
  { id: 'M1292', animal: 'Injured Eagle', emoji: '🦅', emojiColor: '#e0e0c0', location: 'Chouf Mountains',     urgency: 'Urgent', since: '2 min ago' },
];

const ACTIVITY = [
  { id: 1, icon: 'checkmark-circle', color: colors.tabActive,  text: 'Mission #M1287 completed by Sara K.', time: '10 min ago' },
  { id: 2, icon: 'person-add',       color: colors.accepted,   text: 'Rami Haddad accepted Mission #M1285', time: '24 min ago' },
  { id: 3, icon: 'flag',             color: colors.high,       text: 'New mission created: Injured Deer',   time: '32 min ago' },
  { id: 4, icon: 'alert-circle',     color: colors.urgent,     text: 'Urgent alert: Injured Eagle in Chouf', time: '1 hr ago' },
  { id: 5, icon: 'checkmark-circle', color: colors.tabActive,  text: 'Mission #M1284 completed by Nour G.', time: '2 hr ago' },
];

export default function AdminScreen({ navigation }) {
  const { logout } = useAuth();
  const [assigningId, setAssigningId] = useState(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Admin Panel</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Welcome */}
        <View style={styles.welcomeCard}>
          <View>
            <Text style={styles.welcomeTitle}>Welcome back, Admin</Text>
            <Text style={styles.welcomeSub}>Here's your control overview for today.</Text>
          </View>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark" size={14} color={colors.tabActive} />
            <Text style={styles.roleText}>Admin</Text>
          </View>
        </View>

        {/* Overview grid */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewGrid}>
          {OVERVIEW.map((item) => (
            <View key={item.label} style={styles.overviewCard}>
              <Ionicons name={item.icon} size={22} color={item.color} />
              <Text style={[styles.overviewNum, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.overviewLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.actionCard, { backgroundColor: action.bg }]}
              onPress={() => action.route && navigation.navigate(action.route)}
              activeOpacity={0.8}
            >
              <Ionicons name={action.icon} size={26} color="#fff" />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Assignments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Assignment</Text>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>{PENDING.length}</Text>
          </View>
        </View>

        {PENDING.map((m) => (
          <View key={m.id} style={styles.pendingCard}>
            <View style={[styles.animalPhoto, { backgroundColor: m.emojiColor }]}>
              <Text style={styles.animalEmoji}>{m.emoji}</Text>
            </View>
            <View style={styles.pendingInfo}>
              <Text style={styles.animalName}>{m.animal}</Text>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.subText}>{m.location}</Text>
              </View>
              <Text style={styles.sinceText}>{m.since}</Text>
            </View>
            <View style={styles.pendingRight}>
              <StatusBadge status={m.urgency} small />
              <TouchableOpacity
                style={styles.assignBtn}
                onPress={() => navigation.navigate('Volunteers')}
              >
                <Text style={styles.assignText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Recent Activity */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {ACTIVITY.map((item, idx) => (
            <View
              key={item.id}
              style={[styles.activityRow, idx < ACTIVITY.length - 1 && styles.activityRowBorder]}
            >
              <View style={[styles.activityIconWrap, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={item.icon} size={16} color={item.color} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Admin" />
    </SafeAreaView>
  );
}
