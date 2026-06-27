import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { volunteersStyles as styles } from '../theme/styles';
import BottomTabBar from '../components/BottomTabBar';

const VOLUNTEERS = [
  { id: 1, initials: 'SK', avatarBg: '#2d4a6a', name: 'Sara Khalil',   location: 'Batroun, North Lebanon',  specialty: 'Wildlife Handler', status: 'Available', missions: 24 },
  { id: 2, initials: 'RH', avatarBg: '#4a2d6a', name: 'Rami Haddad',   location: 'Beirut',                  specialty: 'Driver',           status: 'Busy',      missions: 18 },
  { id: 3, initials: 'MF', avatarBg: '#2d6a4a', name: 'Maya Frem',     location: 'Jounieh',                 specialty: 'Vet Tech',         status: 'Available', missions: 31 },
  { id: 4, initials: 'KN', avatarBg: '#6a4a2d', name: 'Karim Nassar',  location: 'Tripoli, North Lebanon',  specialty: 'Wildlife Handler', status: 'Available', missions: 12 },
  { id: 5, initials: 'LA', avatarBg: '#3a3a4a', name: 'Lara Aoun',     location: 'Sidon, South Lebanon',    specialty: 'Driver',           status: 'Offline',   missions: 8  },
  { id: 6, initials: 'TS', avatarBg: '#4a2d3a', name: 'Tarek Saad',    location: 'Tyre, South Lebanon',     specialty: 'Vet Tech',         status: 'Busy',      missions: 15 },
  { id: 7, initials: 'NG', avatarBg: '#2d5a3a', name: 'Nour Gemayel',  location: 'Jbeil',                   specialty: 'Wildlife Handler', status: 'Available', missions: 27 },
  { id: 8, initials: 'EK', avatarBg: '#5a3a2d', name: 'Elie Khoury',   location: 'Zahle, Bekaa',            specialty: 'Driver',           status: 'Available', missions: 9  },
];

const STATUS_FILTERS = ['All', 'Available', 'Busy', 'Offline'];

const STATUS_DOT = {
  Available: colors.tabActive,
  Busy:      colors.high,
  Offline:   colors.textMuted,
};

const STATUS_TEXT = {
  Available: colors.tabActive,
  Busy:      colors.high,
  Offline:   colors.textMuted,
};

export default function VolunteersScreen({ navigation }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? VOLUNTEERS
    : VOLUNTEERS.filter((v) => v.status === filter);

  const counts = {
    available: VOLUNTEERS.filter((v) => v.status === 'Available').length,
    busy:      VOLUNTEERS.filter((v) => v.status === 'Busy').length,
    offline:   VOLUNTEERS.filter((v) => v.status === 'Offline').length,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Volunteers</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: colors.tabActive }]}>{counts.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: colors.high }]}>{counts.busy}</Text>
          <Text style={styles.statLabel}>Busy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: colors.textMuted }]}>{counts.offline}</Text>
          <Text style={styles.statLabel}>Offline</Text>
        </View>
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Volunteer list */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {filtered.map((v) => (
          <View key={v.id} style={styles.card}>
            {/* Avatar */}
            <View style={[styles.avatar, { backgroundColor: v.avatarBg }]}>
              <Text style={styles.avatarText}>{v.initials}</Text>
              <View style={[styles.statusDot, { backgroundColor: STATUS_DOT[v.status] }]} />
            </View>

            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.name}>{v.name}</Text>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.sub}>{v.location}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="ribbon-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.sub}>{v.specialty}</Text>
              </View>
            </View>

            {/* Right column */}
            <View style={styles.right}>
              <Text style={[styles.statusLabel, { color: STATUS_TEXT[v.status] }]}>
                {v.status}
              </Text>
              <Text style={styles.missionsCount}>{v.missions} missions</Text>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call-outline" size={16} color={colors.tabActive} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 8 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Volunteers" />
    </SafeAreaView>
  );
}
