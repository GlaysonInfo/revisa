import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config.dart';
import '../models.dart';

class ApiService {
  String? _token;

  Future<LoginResponse> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('${AppConfig.apiBaseUrl}/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha no login');
    }

    final parsed = LoginResponse.fromJson(jsonDecode(response.body));
    _token = parsed.accessToken;
    return parsed;
  }

  Future<void> createCitizen(CitizenPayload payload) async {
    final response = await http.post(
      Uri.parse('${AppConfig.apiBaseUrl}/citizens'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_token',
      },
      body: jsonEncode(payload.toJson()),
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      throw Exception('Falha ao cadastrar cidadao');
    }
  }

  Future<List<CitizenSummary>> listCitizens() async {
    return searchCitizens();
  }

  Future<List<CitizenSummary>> searchCitizens({
    String? query,
    String? neighborhood,
  }) async {
    final params = <String, String>{};
    if (query != null && query.trim().isNotEmpty) {
      params['query'] = query.trim();
    }
    if (neighborhood != null && neighborhood.trim().isNotEmpty) {
      params['neighborhood'] = neighborhood.trim();
    }

    final uri = Uri.parse('${AppConfig.apiBaseUrl}/citizens').replace(
      queryParameters: params.isEmpty ? null : params,
    );
    final response = await http.get(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_token',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao carregar cadastros');
    }

    final parsed = jsonDecode(response.body) as Map<String, dynamic>;
    final items = (parsed['items'] as List<dynamic>? ?? [])
        .cast<Map<String, dynamic>>()
        .map(CitizenSummary.fromJson)
        .toList();
    return items;
  }

  Future<CitizenDetail> getCitizen(String id) async {
    final response = await http.get(
      Uri.parse('${AppConfig.apiBaseUrl}/citizens/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_token',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao carregar o cadastro');
    }

    return CitizenDetail.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  }

  Future<void> updateCitizen(String id, CitizenPayload payload) async {
    final response = await http.put(
      Uri.parse('${AppConfig.apiBaseUrl}/citizens/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_token',
      },
      body: jsonEncode(payload.toJson()),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar cadastro');
    }
  }
}
