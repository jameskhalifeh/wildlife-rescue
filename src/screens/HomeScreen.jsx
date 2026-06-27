import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { homeStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';

const MISSIONS = [
  { id: 1, animal: 'Injured Owl', emoji: '🦉', emojiColor: '#d4e8c8', location: 'Batroun, North Lebanon', status: 'On the way', urgency: 'Urgent' },
  { id: 2, animal: 'Injured Fox', emoji: '🦊', emojiColor: '#e8d8c0', location: 'Bsharri, North Lebanon', status: 'Accepted', urgency: 'High' },
  { id: 3, animal: 'Sea Turtle', emoji: '🐢', emojiColor: '#c8e0d8', location: 'Tyre, South Lebanon',    status: 'Picked up', urgency: 'Medium' },
];

const ALERTS = [
  { id: 1, animal: 'Injured Hawk', emoji: '🦅', emojiColor: '#e0e0c0', location: 'Jezzine, South Lebanon', time: '10 min ago', urgency: 'Urgent' },
];

function AnimalPhoto({ emoji, bg, size = 56 }) {
  return (
    <View style={[styles.animalPhoto, { backgroundColor: bg, width: size, height: size, borderRadius: size * 0.18 }]}>
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Admin')}>
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Good morning, Admin 👋</Text>
          <Text style={styles.subGreeting}>Here's what's happening today.</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[['8','Active\nMissions'], ['3','Pending\nMissions'], ['12','Volunteers\nOnline']].map(([num, label]) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNum}>{num}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Active Missions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Missions</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>

        {MISSIONS.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={styles.missionCard}
            onPress={() => navigation.navigate('MissionTracking')}
            activeOpacity={0.75}
          >
            <AnimalPhoto emoji={m.emoji} bg={m.emojiColor} />
            <View style={styles.missionInfo}>
              <Text style={styles.animalName}>{m.animal}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.locationText}>{m.location}</Text>
              </View>
              <StatusBadge status={m.urgency} small />
            </View>
            <StatusBadge status={m.status} small />
          </TouchableOpacity>
        ))}

        {/* Recent Alerts */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>

        {ALERTS.map((a) => (
          <View key={a.id} style={styles.missionCard}>
            <AnimalPhoto emoji={a.emoji} bg={a.emojiColor} />
            <View style={styles.missionInfo}>
              <Text style={styles.animalName}>{a.animal}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.locationText}>{a.location}</Text>
              </View>
              <Text style={styles.timeText}>{a.time}</Text>
            </View>
            <StatusBadge status={a.urgency} small />
          </View>
        ))}

        <View style={{ height: 8 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Dashboard" />
    </SafeAreaView>
  );
}

