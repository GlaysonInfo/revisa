import 'package:flutter/material.dart';

import 'screens/home_screen.dart';
import 'screens/login_screen.dart';

class RevisaApp extends StatelessWidget {
  const RevisaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'REVISA',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
      initialRoute: '/login',
      routes: {
        '/login': (_) => const LoginScreen(),
        '/home': (_) => const HomeScreen(),
      },
    );
  }
}
