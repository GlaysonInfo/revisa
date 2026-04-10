import 'package:flutter/material.dart';

import '../services/api_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'admin@revisa.local');
  final _passwordController = TextEditingController(text: 'Admin@12345');
  final _api = ApiService();
  String _message = '';

  Future<void> _login() async {
    try {
      await _api.login(_emailController.text, _passwordController.text);
      if (!mounted) return;
      Navigator.pushReplacementNamed(context, '/home', arguments: _api);
    } catch (_) {
      setState(() => _message = 'Falha no login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Entrar')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email')),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Senha'),
              obscureText: true,
            ),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: _login, child: const Text('Entrar')),
            const SizedBox(height: 12),
            Text(_message),
          ],
        ),
      ),
    );
  }
}
