import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { volunteerHomeStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

const MY_MISSION = {
  id: 'M1287', animal: 'Injured Deer', emoji: '🦌', emojiColor: '#e4dcc0',
  location: 'Bekaa Valley', status: 'On the way',
};

const AVAILABLE = [
  { id: 'M1293', animal: 'Injured Falcon', emoji: '🦅', emojiColor: '#e0e0c0', location: 'Bcharre, North Lebanon',   urgency: 'Urgent', distance: '12 km', time: '5 min ago'  },
  { id: 'M1294', animal: 'Sea Turtle',     emoji: '🐢', emojiColor: '#c8e0d8', location: 'Tyre Coast, South Lebanon', urgency: 'High',   distance: '28 km', time: '15 min ago' },
  { id: 'M1295', animal: 'Wild Boar',      emoji: '🐗', emojiColor: '#e4dcc0', location: 'Chouf Forest',              urgency: 'Medium', distance: '34 km', time: '22 min ago' },
  { id: 'M1296', animal: 'Injured Owl',    emoji: '🦉', emojiColor: '#d4e8c8', location: 'Batroun Valley',            urgency: 'High',   distance: '8 km',  time: '31 min ago' },
];

export default function VolunteerHomeScreen({ navigation }) {
  const { auth } = useAuth();
  const firstName = (auth.user?.name ?? 'Volunteer').split(' ')[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
          <Text style={styles.subGreeting}>Ready to help today?</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Active mission */}
        <Text style={styles.sectionTitle}>My Active Mission</Text>
        <View
          style={styles.activeMissionCard}
        >
          <View style={[styles.activeMissionPhoto, { backgroundColor: MY_MISSION.emojiColor }]}>
            <Text style={{ fontSize: 28 }}>{MY_MISSION.emoji}</Text>
          </View>
          <View style={styles.activeMissionInfo}>
            <Text style={styles.activeMissionAnimal}>{MY_MISSION.animal}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.locationText}>{MY_MISSION.location}</Text>
            </View>
            <StatusBadge status={MY_MISSION.status} small />
          </View>
        </View>

        {/* Available missions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Missions</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{AVAILABLE.length}</Text>
          </View>
        </View>

        {AVAILABLE.map(m => (
          <TouchableOpacity
            key={m.id}
            style={styles.missionCard}
            onPress={() => navigation.navigate('MissionDetails')}
            activeOpacity={0.75}
          >
            <View style={[styles.animalPhoto, { backgroundColor: m.emojiColor }]}>
              <Text style={{ fontSize: 26 }}>{m.emoji}</Text>
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.animalName}>{m.animal}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.locationText}>{m.location}</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="navigate-outline" size={11} color={colors.textMuted} />
                <Text style={styles.metaText}>{m.distance}</Text>
                <Text style={styles.metaDot}> · </Text>
                <Text style={styles.metaText}>{m.time}</Text>
              </View>
            </View>
            <StatusBadge status={m.urgency} small />
          </TouchableOpacity>
        ))}

        <View style={{ height: 8 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Missions" />
    </SafeAreaView>
  );
}
