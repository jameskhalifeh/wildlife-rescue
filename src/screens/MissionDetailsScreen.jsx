import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { missionDetailsStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

function LiveMap() {
  return (
    <View style={styles.mapWrapper}>
      {/* Map background */}
      <View style={styles.mapBg}>
        {/* Grid roads */}
        <View style={[styles.mapRoad, { top: '20%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.mapRoad, { top: '50%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.mapRoad, { top: '75%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.mapRoad, { left: '18%', top: 0, bottom: 0, width: 2 }]} />
        <View style={[styles.mapRoad, { left: '50%', top: 0, bottom: 0, width: 2 }]} />
        <View style={[styles.mapRoad, { left: '78%', top: 0, bottom: 0, width: 2 }]} />

        {/* Route: horizontal then vertical */}
        <View style={styles.mapRouteH} />
        <View style={styles.mapRouteV} />

        {/* Volunteer dot (blue) — bottom left */}
        <View style={styles.volunteerRing}>
          <View style={styles.volunteerDot} />
        </View>
        <Text style={styles.volunteerLabel}>You</Text>

        {/* Animal pin (red) — top right */}
        <View style={styles.animalPinWrap}>
          <View style={styles.animalPinHead} />
          <View style={styles.animalPinTail} />
        </View>
        <Text style={styles.animalLabel}>Animal</Text>
      </View>

      {/* Distance / ETA bar */}
      <View style={styles.mapBar}>
        <View style={styles.mapBarItem}>
          <Ionicons name="navigate-outline" size={14} color={colors.tabActive} />
          <Text style={styles.mapBarLabel}>Distance</Text>
          <Text style={styles.mapBarValue}>45 km</Text>
        </View>
        <View style={styles.mapBarDivider} />
        <View style={styles.mapBarItem}>
          <Ionicons name="time-outline" size={14} color={colors.tabActive} />
          <Text style={styles.mapBarLabel}>Est. Time</Text>
          <Text style={styles.mapBarValue}>55 min</Text>
        </View>
        <View style={styles.mapBarDivider} />
        <View style={styles.mapBarItem}>
          <Ionicons name="location-outline" size={14} color={colors.danger} />
          <Text style={styles.mapBarLabel}>Animal at</Text>
          <Text style={styles.mapBarValue}>Batroun</Text>
        </View>
      </View>
    </View>
  );
}

export default function MissionDetailsScreen({ navigation }) {
  const { auth } = useAuth();
  const isVolunteer = auth.role === 'volunteer';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mission Details</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-social-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={styles.badgeRow}>
          <StatusBadge status="New Mission" />
          <Text style={styles.missionId}>Mission ID: #M1287</Text>
        </View>

        <View style={styles.heroPhoto}>
          <Text style={styles.heroEmoji}>🦉</Text>
        </View>

        <View style={styles.nameRow}>
          <Text style={styles.animalName}>Injured Owl</Text>
          <StatusBadge status="Urgent" />
        </View>

        {/* Location labels */}
        <View style={styles.locationsCard}>
          <View style={styles.locationRow}>
            <Ionicons name="radio-button-on" size={14} color={colors.mapOrigin} />
            <Text style={styles.locationText}>Your location</Text>
          </View>
          <View style={styles.locationDividerRow}>
            <View style={styles.locationDividerLine} />
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={colors.danger} />
            <Text style={styles.locationText}>Batroun, North Lebanon</Text>
          </View>
        </View>

        {/* Live map — volunteer only */}
        {isVolunteer && (
          <>
            <Text style={styles.mapSectionTitle}>Live Location</Text>
            <LiveMap />
          </>
        )}

        {/* Details */}
        <Text style={[styles.detailsHeader, { marginTop: 20 }]}>Details</Text>

        <View style={styles.detailItem}>
          <View style={styles.detailIcon}>
            <Ionicons name="alert-circle-outline" size={16} color={colors.textSecondary} />
          </View>
          <Text style={styles.detailText}>
            The owl is injured. Please handle with care and transport in a dark, ventilated box.
          </Text>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.detailIcon}>
            <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
          </View>
          <Text style={styles.detailText}>
            No food or water. Keep calm and contact the center if needed.
          </Text>
        </View>

        <View style={{ height: 16 }} />

        {isVolunteer ? (
          <>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => navigation.navigate('VolunteerHome')}
              activeOpacity={0.85}
            >
              <Text style={styles.acceptText}>Accept Mission</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.declineBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.acceptText}>Back to Tracking</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab={isVolunteer ? 'Missions' : 'Dashboard'} />
    </SafeAreaView>
  );
}
