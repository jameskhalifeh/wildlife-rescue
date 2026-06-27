import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';
import { statusBadgeStyles as styles } from '../theme/styles';

const CONFIG = {
  'Urgent':      { bg: colors.urgentBg,     text: colors.urgent },
  'High':        { bg: colors.highBg,       text: colors.high },
  'Medium':      { bg: colors.mediumBg,     text: colors.medium },
  'Accepted':    { bg: colors.acceptedBg,   text: colors.accepted },
  'Picked up':   { bg: colors.pickedUpBg,   text: colors.pickedUp },
  'On the way':  { bg: colors.onTheWayBg,   text: colors.onTheWay },
  'Delivered':   { bg: colors.deliveredBg,  text: colors.delivered },
  'New Mission': { bg: colors.newMissionBg, text: colors.newMission },
};

export default function StatusBadge({ status, small }) {
  const cfg = CONFIG[status] || { bg: colors.border, text: colors.textSecondary };
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }, small && styles.small]}>
      <Text style={[styles.text, { color: cfg.text }, small && styles.smallText]}>
        {status}
      </Text>
    </View>
  );
}

